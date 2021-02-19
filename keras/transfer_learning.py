import glob
import matplotlib.pyplot as plt
from keras.applications.inception_v3 import InceptionV3, preprocess_input
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import SGD
from keras.models import Model
from keras.layers import Dense, GlobalAveragePooling2D
from keras.preprocessing.image import ImageDataGenerator
import os 

def get_num_files(path):
    if not os.path.exists(path):
        return 0
    return sum([len(files) for r, d ,files in os.walk(path)])

def create_img_gen():
    return ImageDataGenerator(preprocessing_function=preprocess_input,rotation_range=30,width_shift_range=0.2,height_shift_range=0.2,shear_range=0.2,zoom_range=0.2,horizontal_flip=True)


width , height = 299,299
epochs = 2
batch_size = 32
num_fc = 1024
num_classes = 2 

train_dir = "./data/train"
val_dir = "./data/test"

num_train_samples = get_num_files(train_dir)
num_val_samples = get_num_files(val_dir)

train_image_gen = create_img_gen()
test_image_gen = create_img_gen()
train_generator = train_image_gen.flow_from_directory(train_dir, target_size = (width,height),batch_size = batch_size, seed = 42)
val_generator = test_image_gen.flow_from_directory(val_dir, target_size = (width,height),batch_size = batch_size, seed = 42)
inceptionv3_base_model = InceptionV3(weights='imagenet', include_top= False) #exclude final FC layer to get transfer

# Add function api to define new classification
x = inceptionv3_base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(num_fc,activation="relu")(x)
predictions = Dense(num_classes,activation="softmax")(x)

# Link input from inception to new classification
model = Model(inputs = inceptionv3_base_model.input, outputs = predictions)

print(model.summary)


# OPT 1: Freeze all layser in inception 
for layer in inceptionv3_base_model.layers:
    layer.trainable = False
model.compile(optimizer='adam',loss="categorical_crossentropy",metrics=['accuracy'])
hist_transfer_learning = model.fit_generator(train_generator,epochs=epochs,steps_per_epoch=num_train_samples,validation_data=val_generator,validation_steps=num_val_samples,class_weight='auto')
model.save("inception_v3_transfer.model")


# OPT 2: Transfer with fine-tuning
layer_to_freeze = 172
for layer in model.layers[:layer_to_freeze]:
    layer.trainable = False
for layer in model.layers[layer_to_freeze:]:
    layer.trainable = True

model.compile(optimizer=SGD(lr=0.00001,momentum=0.9),loss="categorical_crossentropy",metrics=['accuracy'])
hist_fine_tune = model.fit_generator(train_generator,epochs=epochs,steps_per_epoch=num_train_samples,validation_data=val_generator,validation_steps=num_val_samples,class_weight='auto')



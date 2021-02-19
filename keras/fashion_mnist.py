import keras
from keras.datasets import fashion_mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K


num_classes =10
batch_size = 128
epochs = 24
rows , cols = 28, 28
(X_tr, y_tr), (X_t, y_t) = fashion_mnist.load_data()

if K.image_data_format() == "channels_first":
    X_tr = X_tr.reshape(X_tr.shape[0],1,rows,cols)
    X_t = X_t.reshape(X_t.shape[0],1,rows,cols)
    input_shape = (1,rows,cols)
else:
    X_tr = X_tr.reshape(X_tr.shape[0],rows,cols,1)
    X_t = X_t.reshape(X_t.shape[0],rows,cols,1)
    input_shape = (rows,cols,1)

X_tr = X_tr.astype("float32")
X_tr /= 255
X_t = X_t.astype("float32")
X_t /= 255

y_tr = keras.utils.to_categorical(y_tr,num_classes)
y_t = keras.utils.to_categorical(y_t,num_classes)


model = Sequential()
model.add(Conv2D(32,kernel_size = (3,3),activation="relu",input_shape = input_shape))
model.add(MaxPooling2D(pool_size = (2,2)))
model.add(Conv2D(32,kernel_size = (3,3),activation="relu"))
model.add(MaxPooling2D(pool_size = (2,2)))
model.add(Flatten())
model.add(Dense(128,activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(num_classes,activation="softmax"))

model.summary()
model.compile(loss = keras.losses.categorical_crossentropy, optimizer = keras.optimizers.Adadelta(),metrics = ["accuracy"])
hist = model.fit(X_tr, y_tr, batch_size=batch_size, epochs=epochs,verbose=1,validation_data=(X_t,y_t))

score = model.evaluate(X_t,y_t,verbose = 0)

from keras.models import load_model

# Creates a HDF5 file 'my_model.h5'
model.save('fashion_mnist.h5')
 
# import numpy as np
# import matplotlib.pyplot as plt
# e_list = list(range(1,len(hist.history["accuracy"])+1))
# plt.plot(e_list,hist.history["accuracy"],e_list,hist.history["val_accuracy"])
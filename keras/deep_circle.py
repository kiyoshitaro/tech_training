from sklearn.datasets import make_circles
import numpy as np
import matplotlib.pyplot as plt
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

def plot_data(pl,X,y):
    pl.plot(X[y==0,0],X[y==0,1],"ob",alpha = 0.5)
    pl.plot(X[y==1,0],X[y==1,1],"xr",alpha=0.5)
    pl.legend(['0','1'])
    return pl


def plot_decision_bound(model,X,y):
    amin, bmin = X.min(axis=0)-0.1
    amax, bmax = X.max(axis=0)+0.1
    hticks = np.linspace(amin,amax,101)
    vticks = np.linspace(amax,bmax,101)

    aa,bb = np.meshgrid(hticks,vticks)
    ab = np.c_[aa.ravel(),bb.ravel()]

    c = model.predict(ab)
    Z = c.reshape(aa.shape)

    plt.figure(figsize=(12,8))
    plt.contourf(aa,bb,Z,cmap="bwr",alpha=0.2)
    plot_data(plt,X,y)
    plt.savefig('foo.png')
    return plt
    
X, y = make_circles(n_samples=1000,factor =0.6, noise = 0.1, random_state=42)
pl = plot_data(pl,X,y)

from sklearn.model_selection import train_test_split
X_tr, X_t, y_tr, y_t = train_test_split(X, y, test_size=0.33, random_state=42)


from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam

# Create model  
model = Sequential()

# Add layer
model.add(Dense(4,input_shape= (2,),activation="tanh",name="Hidden_1"))
model.add(Dense(4,activation="tanh",name="Hidden_2"))
model.add(Dense(1,activation="sigmoid",name="Out_layer"))


# functional API
from keras.models import Model
from keras.layers import Input
inputs = Input(shape=(2,))
x = Dense(4,input_shape= (2,),activation="tanh",name="Hidden_1")(inputs)
x = Dense(4,activation="tanh",name="Hidden_2")(x)
o = Dense(1,activation="sigmoid",name="Out_layer")(x)
model = Model(inputs=inputs,outputs = o)



model.summary()


# Compile 
model.compile(Adam(lr=0.05),"binary_crossentropy",metrics=["accuracy"])
from keras.utils import plot_model

# Visualize model
plot_model(model,to_file="model.png",show_shapes=True,show_layer_names=True)

# Early stopping
from keras.callbacks import EarlyStopping
my_callbacks = [EarlyStopping(monitor="acc",patience=5,mode=max)]


# Train 
model.fit(X_tr,y_tr,epochs=100,verbose=1, callbacks = my_callbacks)
# Evaluate
eval_res = model.evaluate(X_t,y_t)


plot_decision_bound(model,X,y).show()



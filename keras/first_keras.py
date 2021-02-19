from sklearn.datasets import make_blobs
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
    return plt
    
X, y = make_blobs(n_samples=1000,centers=2,random_state=42)
pl = plot_data(pl,X,y)

from sklearn.model_selection import train_test_split
X_tr, X_t, y_tr, y_t = train_test_split(X, y, test_size=0.33, random_state=42)


from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam

# Create model  
model = Sequential()
# Add layer
model.add(Dense(1,input_shape= (2,),activation="sigmoid"))
# Compile 
model.compile(Adam(lr=0.05),"binary_crossentropy",metrics=["accuracy"])
# Train 
model.fit(X_tr,y_tr,epochs=100,verbose=0)
# Evaluate
eval_res = model.evaluate(X_t,y_t)

plot_decision_bound(model,X,y).show()
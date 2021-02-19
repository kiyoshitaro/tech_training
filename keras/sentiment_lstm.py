from keras.preprocessing import sequence
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM
from keras.callbacks import EarlyStopping
from keras.datasets import imdb


num_words = 6000
skip_top = 0 #
max_review_len = 400
(X_tr, y_tr), (X_t, y_t) = imdb.load_data(num_words=num_words, skip_top=skip_top)
X_tr = sequence.pad_sequences(X_tr,maxlen=max_review_len)
X_t = sequence.pad_sequences(X_t,maxlen=max_review_len)

model = Sequential()
model.add(Embedding(num_words,64))
model.add(LSTM(128))
model.add(Dense(1,activation="sigmoid"))

model.compile(loss="binary_crossentropy",optimizer = "adam", metrics = ["accuracy"])
batch_size = 24
epochs = 5
cbk_early_stopping = EarlyStopping(monitor='val_acc',mode= "max")
model.fit(X_tr,y_tr,batch_size,epochs=epochs,validation_data=(X_t,y_t),callbacks=[cbk_early_stopping])
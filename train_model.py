import numpy as np
import os
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
import tensorflow as tf
import json
import tensorflowjs as tfjs  # Import the tensorflowjs module

# Load and preprocess data
DATA_PATH = os.path.join("/Users/harishpariyar/Documents/caps/Kritagya_dataset")
actions = np.array(["HELLO","BYE","TEACHER","THANK YOU","SORRY","HOW ARE YOU","MY NAME IS",
                    "WHITE","BLACK","BROWN","BLUE","CHAIR","TABLE","CAR","FAMILY",
                    "DOG","CAT","COW","GOAT","RAT","HOUSE","HAPPY","FISH","GOOD MORNING"])
no_sequences = 45
sequence_length = 20

label_map = {label:num for num, label in enumerate(actions)}

sequences, labels = [], []
for action in actions:
    for sequence in range(no_sequences):
        window = []
        for frame_num in range(sequence_length):
            res = np.load(os.path.join(DATA_PATH, action, str(sequence), f"{frame_num}.npy"))
            window.append(res)
        sequences.append(window)
        labels.append(label_map[action])

X = np.array(sequences)
y = to_categorical(labels).astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Define and train the model
model = tf.keras.models.Sequential([
    tf.keras.layers.LSTM(64, return_sequences=True, activation='relu', input_shape=(20, 258),
                         kernel_initializer='glorot_uniform'),
    tf.keras.layers.LSTM(128, return_sequences=True, activation='relu',
                         kernel_initializer='glorot_uniform'),
    tf.keras.layers.LSTM(64, return_sequences=False, activation='relu',
                         kernel_initializer='glorot_uniform'),
    tf.keras.layers.Dense(64, activation='relu', kernel_initializer='glorot_uniform'),
    tf.keras.layers.Dense(32, activation='relu', kernel_initializer='glorot_uniform'),
    tf.keras.layers.Dense(actions.shape[0], activation='softmax')
])

model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])
model.fit(X_train, y_train, epochs=50, validation_data=(X_test, y_test))

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Loss: {loss}, Test Accuracy: {accuracy}')


# Save the model in TensorFlow.js format directly
tfjs_target_dir = '/Users/harishpariyar/Documents/caps/public/ml_model_tfjs'
os.makedirs(tfjs_target_dir, exist_ok=True)

# Export directly to TensorFlow.js Layers format
tfjs.converters.save_keras_model(model, tfjs_target_dir)
print(f"Model saved in TensorFlow.js format at {tfjs_target_dir}")

# Save the actions array
with open('/Users/harishpariyar/Documents/caps/public/ISL_actions.json', 'w') as f:
    json.dump(actions.tolist(), f)
print("Actions array saved as ISL_actions.json")
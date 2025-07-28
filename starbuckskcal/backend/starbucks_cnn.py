
import tensorflow as tf         # 딥러닝 모델을 만들고 훈련시키는 핵심 라이브러리
import matplotlib.pyplot as plt # 훈련 결과를 그래프로 시각화할 때 사용
import numpy as np              # 숫자 계산, 특히 배열(행렬) 다루는 데 필수적인 라이브러리
import os                       # 파일 시스템(폴더, 파일)을 다룰 때 사용

# 1. 구글 드라이브 연결 (Mount)
# Google Colab 환경에서 내 구글 드라이브에 저장된 데이터에 접근하기 위해 연결하는 코드입니다.
# 이 코드를 실행하면 인증 절차를 거쳐 구글 드라이브가 Colab 환경에 '마운트(연결)'됩니다.
try:
    from google.colab import drive
    drive.mount('/content/drive')
    print(" 구글 드라이브 연결 성공!")
except ImportError:
    print(" 구글 Colab 환경이 아닙니다. 로컬에서 실행 중입니다.")

# 2. 데이터 경로 설정 (★★★★★ 직접 수정해야 하는 유일한 부분 ★★★★★)
# 이 변수에 스타벅스 음료 사진들이 들어있는 폴더의 '절대 경로'를 지정합니다.
# 이 경로가 틀리면 데이터를 불러올 수 없어 에러가 발생합니다.
# Colab 왼쪽 파일 탐색기에서 해당 폴더를 찾아 '경로 복사' 기능을 사용하는 것이 가장 정확합니다.
data_dir = '/content/drive/MyDrive/beverage'  #  이 부분을 본인의 경로로 수정해야 합니다!

# 설정된 경로가 실제로 존재하는지 확인하는 코드입니다.
if not os.path.exists(data_dir):
    print(f" 에러: ' {data_dir}' 경로를 찾을 수 없습니다.")
    print(" 2번 항목의 data_dir 변수에 올바른 경로를 입력했는지 다시 확인해주세요.")
else:
    print(f" 데이터 경로 설정 완료:  {data_dir}")
    print(f" 감지된 음료 폴더: {os.listdir(data_dir)}")

# 3. 데이터셋 준비 (훈련용/검증용 분리 및 데이터 증강)
# 이미지 크기와 배치 사이즈 설정
IMG_SIZE = (160, 160)
BATCH_SIZE = 8 # 데이터가 적으므로 배치 사이즈를 작게 설정

# 폴더 경로로부터 훈련(80%) 및 검증(20%) 데이터셋 생성
print("[1/4] 데이터셋을 준비합니다...")
# tf.keras.utils.image_dataset_from_directory 함수:
# - 지정된 폴더(data_dir)를 스캔하여 하위 폴더 이름을 클래스(음료 종류)로 인식합니다.
# - 이미지 파일들을 읽어와 IMG_SIZE로 크기를 조절하고, BATCH_SIZE로 묶어줍니다.
# - validation_split에 따라 훈련용과 검증용으로 데이터를 자동으로 분리합니다.
train_dataset = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2, # train_dataset과 동일한 값
    subset="validation", # <-- 이 부분이 중요합니다!
    seed=123, # train_dataset과 동일한 값
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)



# 클래스(음료) 이름 확인
class_names = train_dataset.class_names
print("감지된 음료 종류:", class_names)

# 데이터 증강 레이어 정의
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip('horizontal'),
    tf.keras.layers.RandomRotation(0.2),
    tf.keras.layers.RandomZoom(0.2),
])

# 4. 전이 학습(Transfer Learning)을 위한 모델 구성
# -----------------------------------
# 사전 훈련된 MobileNetV2 모델 불러오기 (이미지넷 가중치 사용)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False, # 분류기는 제외하고 특징 추출 부분만 가져옴
    weights='imagenet'
)

# 베이스 모델의 가중치는 훈련 중에 업데이트되지 않도록 동결
base_model.trainable = False

# 모델 구성: 데이터 증강 -> 사전 훈련 모델 -> 분류기
inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
x = data_augmentation(inputs) # 데이터 증강 적용
x = tf.keras.applications.mobilenet_v2.preprocess_input(x) # MobileNetV2에 맞는 형식으로 픽셀값 조정
x = base_model(x, training=False) # 베이스 모델 (특징 추출)
x = tf.keras.layers.GlobalAveragePooling2D()(x) # 추출된 특징들을 평균내어 벡터로 만듬
x = tf.keras.layers.Dropout(0.2)(x) # 과적합 방지를 위한 드롭아웃
# 최종 출력층(분류기): 우리가 가진 음료 종류 수만큼 뉴런 설정
outputs = tf.keras.layers.Dense(len(class_names), activation='softmax')(x)

model = tf.keras.Model(inputs, outputs)

# 5. 모델 컴파일 및 훈련
# -----------------------------------
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(),
    metrics=['accuracy']
)

print("모델 훈련을 시작합니다...")
# 데이터 양이 적으므로 에포크(반복 훈련 횟수)를 15로 설정
history = model.fit(
    train_dataset,
    epochs=15,
    validation_data=validation_dataset
)
print("모델 훈련이 완료되었습니다.")

# 6. 훈련 결과 시각화
# -----------------------------------
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(acc, label='Training Accuracy')
plt.plot(val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(loss, label='Training Loss')
plt.plot(val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()

# Makes the required Apple 6.3 set (1206 x 2622) from the 6.9 boards. py store_63.py
import glob, os
from PIL import Image
R = r'C:\Users\user\Desktop\App Stores Submission Assets\apple'
os.makedirs(R + r'\screenshots-6.3', exist_ok=True)
for f in glob.glob(R + r'\screenshots-6.9\*.png'):
    n = os.path.basename(f).replace('6.9', '6.3')
    Image.open(f).convert('RGB').resize((1206, 2622), Image.LANCZOS).save(os.path.join(R, 'screenshots-6.3', n))
print('ok')

# -*- coding: UTF-8 -*-
#正则表达式
import re
print(re.match('www','www.baidu.com').span())
print(re.match('www','www.baidu.com'))
line = "Cats are smarter than dogs"
machtOji=re.match(r'(.*)are(.*?).*',line,re.M|re.I);
if machtOji:
    print("matchObj.group() :",machtOji.group())
    print("matchObj.group(1) :",machtOji.group(1))
    print("matchObj.group(2) :",machtOji.group(2))
else:
    print("No match!!")
line = "Cats are smarter than dogs";

matchObj = re.match(r'dogs', line, re.M | re.I)
if matchObj:
    print("match --> matchObj.group() : ", matchObj.group())
else:
    print ("No match!!")

matchObj = re.search(r'dogs', line, re.M | re.I)
if matchObj:
    print ("search --> matchObj.group() : ", matchObj.group())

else:
    print("No match!!")

    phone = "2004-959-559 # 这是一个国外电话号码"
    # 删除字符串中的 Python注释
    num = re.sub(r'#.*$', "", phone)
    print("电话号码是: ", num)
    # 删除非数字(-)的字符串
    num = re.sub(r'\D', "", phone)
    print("电话号码是 : ", num)


# 将匹配的数字乘以 2
def double(matched):
    value = int(matched.group('value'))
    return str(value * 2)
s = 'A23G4HFD567'
print(re.sub('(?P<value>\d+)', double, s))

pattern = re.compile(r'\d+')                    # 用于匹配至少一个数字
m = pattern.match('one12twothree34four')
print (m)
m = pattern.match('one12twothree34four', 2, 10)
print (m)
m = pattern.match('one12twothree34four', 3, 10)
print(m)
pattern = re.compile(r'\d+')  # 查找数字
result1 = pattern.findall('runoob 123 google 456')
result2 = pattern.findall('run88oob123google456', 0, 10)

print(result1)
print(result2)
it = re.finditer(r"\d+","12a32bc43jf3")
for match in it:
    print (match.group() )
li1=[1,57,3,10,9,10,57]
li1.sort()
print(li1)

import random
print(random.random())#{0,1)之间的数
print(random.randrange(10,23))#【10,20】之间任何一个数











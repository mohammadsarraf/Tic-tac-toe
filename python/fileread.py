# f = open("demofile2.txt", "a")
# line = f.readline()


#open and read the file after the appending:
f = open("demofile2.txt", "r")
lines = []
for line in f:
  lines.append(line)
print(lines[1].split()[0])
print(lines[1])
# Combinations: take R items on N total items
# 
# def combos(collection, r)
# 
new_arr = []
def combos(arr, r):
    sort = list(set(sorted(arr)))
    ran = len(sort)
    if(r > len(arr)):
        return
    for i in range(ran-1):

        for j in range(ran):
            if not checkTwo(sort[i], sort[j]) and i != j:
                new_arr.append([sort[i], sort[j]])
    print(new_arr)

def checkTwo(a, b):
    if [a, b] in new_arr or [b, a] in new_arr:
        return True
    else:
        return False


combos([1,2,3,4,5], 2)
# >>> [
#     [1,2],
#     [2,3],
#     [1,3],
# ]
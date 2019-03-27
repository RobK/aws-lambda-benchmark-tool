def solution(A):
  new_A = sorted(set(A), key= lambda x: x)
  previous_value = 0

  for i in new_A:
    if i<=0:
      continue
    if i!=previous_value + 1:
      break
    previous_value = i

  return previous_value+1
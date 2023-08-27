const STATUS = {
  0: 'TODO',
  1: 'DOING',
  2: 'PAUSED',
  3: 'DONE'
}

export const verifyStatusByIndex = (index) => {
  return STATUS[index]
}
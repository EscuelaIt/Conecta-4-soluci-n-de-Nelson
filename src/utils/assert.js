export function assert(condition, message){
  if(false === condition){
    throw message ?? 'Assertion Failed'
  }
}
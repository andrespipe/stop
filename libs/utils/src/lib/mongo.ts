export const mongoUUIDFnDef = {
  "%function": {
    "name": "UUID",
    "arguments": undefined
  }
}

export function mongoUUID(): {} {
  return JSON.parse(JSON.stringify(mongoUUIDFnDef));
}
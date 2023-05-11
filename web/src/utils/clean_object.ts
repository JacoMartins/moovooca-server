import moment from "moment";

export function clean_object(inputObject: Record<string, any>): Record<string, any> {
  const cleanedObject: Record<string, any> = {};

  for (const [key, value] of Object.entries(inputObject)) {
    if (key === 'id' || key === 'criado_em' || key === 'atualizado_em') {
      cleanedObject[key] = null
      continue
    }

    if (key.startsWith('dat') && typeof value !== 'object') {
      cleanedObject[key] = moment().format().substring(0, 10) + 'T00:00'
      continue
    }

    if (key.startsWith('hor') && typeof value !== 'object') {
      cleanedObject[key] = moment().format().substring(0, 16)
      continue
    }

    if (typeof value === "string") {
      cleanedObject[key] = "";
    }

    if (typeof value === "number") {
      cleanedObject[key] = isNaN(value) ? null : 0;
    }
  }

  return cleanedObject;
}
import { Builder, Component, builder } from '@builder.io/sdk'

export function restrictedRegister(
  component: any,
  options: Component,
  models: string[]
) {
  if (!Builder.isEditing || models.includes(builder.editingModel!)) {
    return Builder.registerComponent(component, options)
  }
}

export function toCapitalizedWords(name) {
  var words = name.match(/[A-Za-z][a-z]*/g) || [];

  return words.map(capitalize).join(" ");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

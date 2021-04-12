import { TypeMap } from './baseTemplate'

const template = [
  {
    title: 'Create a Log',
    formItems: [
      {
        displayName: 'Fever',
        description: 'A high body temperature of over 37.2C or 100.4F and you feel hot to the touch on your chest or back.',
        name: 'fever',
        type: 'boolean'
      },
      {
        displayName: 'Abdominal Pain',
        description: 'Pain from inside the abdomen or the outer muscle wall, ranging from mild and temporary to severe.',
        name: 'abdominalPain',
        type: 'boolean'
      },
      {
        displayName: 'Chills',
        description: 'The feeling of being cold, though not necessarily in a cold environment, often accompanied by shivering or shaking.',
        name: 'chills',
        type: 'boolean'
      },
      {
        displayName: 'Cough',
        description: 'A rapid expulsion of air from the lungs, typically in order to clear the throat of any irritants, mucus, fluids, or other material',
        name: 'cough',
        type: 'boolean'
      },
      {
        displayName: 'Diarrhea',
        description: 'Loose, watery bowel movements that may occur three or more times a day with a sense of urgency',
        name: 'diarrhea',
        type: 'boolean'
      },
      {
        displayName: 'Difficulty Breathing',
        description: 'Shortness of breath, trouble inhaling or exhaliing, or feels as though you cannot get enough oxygen.',
        name: 'difficultyBreathing',
        type: 'boolean'
      },
      {
        displayName: 'Headache',
        description: 'A sharp pain, throbbing sensation, or dull ache that occurs in any region of the head and may last from less than an hour to several days.',
        name: 'headache',
        type: 'boolean'
      },
      {
        displayName: 'Sore Throat',
        description: 'A raw, scratchy, burning feeling at the back of your throat that makes it difficult to swallow and may make your voice hoarse.',
        name: 'soreThroat',
        type: 'boolean'
      },
      {
        displayName: 'Nausea or Vomiting',
        description: 'An uneasiness of the stomach which could then result in the involuntary emptying of stomach contents through the mouth.',
        name: 'nauseaOrVomiting',
        type: 'boolean'
      },
      {
        displayName: 'Others',
        name: 'others',
        type: 'string'
      }
    ]
  }
] as const

type formItemName = (typeof template)[number]['formItems'][number]['name'] | string;
type formItemType = TypeMap[(typeof template)[number]['formItems'][number]['type']];

export type LogData = {
  [x in formItemName]?: formItemType;
}

export default template

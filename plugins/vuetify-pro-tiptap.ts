import {
  VuetifyTiptap,
  VuetifyViewer,
  createVuetifyProTipTap
  ,
  BaseKit,
  Bold,
  Italic,
  Underline,
  Strike,
  Color,
  Highlight,
  Heading,
  TextAlign,
  FontFamily,
  FontSize,
  SubAndSuperScript,
  BulletList,
  OrderedList,
  TaskList,
  Indent,
  Link,
  Video,
  Table,
  Blockquote,
  HorizontalRule,
  Code,
  CodeBlock,
  Clear,
  Fullscreen,
  History
} from 'vuetify-pro-tiptap'

import 'vuetify-pro-tiptap/style.css'
// import SelectImage from "../components/SelectImage.vue";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetifyProTipTap = createVuetifyProTipTap({
    lang: 'en',
    components: {
      VuetifyTiptap,
      VuetifyViewer
    },
    extensions: [
      BaseKit.configure({
        placeholder: {
          placeholder: 'Enter some text...'
        }
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Code.configure({ divider: true }),
      Heading,
      TextAlign,
      FontFamily,
      FontSize,
      Color,
      Highlight.configure({ divider: true }),
      SubAndSuperScript.configure({ divider: true }),
      Clear.configure({ divider: true }),
      BulletList,
      OrderedList,
      TaskList,
      Indent.configure({ divider: true }),
      Link,
      // Image.configure({
      //   imageTabs: [{ name: "SELECT", component: markRaw(SelectImage) }],
      //   // hiddenTabs: ['upload'],
      //   upload(file: File) {
      //     const url = URL.createObjectURL(file);
      //     console.log("mock upload api :>> ", url);
      //     return Promise.resolve(url);
      //   },
      // }),
      Video,
      Table,
      Blockquote,
      HorizontalRule,
      CodeBlock.configure({ divider: true }),
      History.configure({ divider: true }),
      Fullscreen
    ]
  })

  nuxtApp.vueApp.use(vuetifyProTipTap)
})

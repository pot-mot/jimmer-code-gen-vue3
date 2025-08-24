import Prism from 'prismjs';
import "./code-style.css";
import "./language/dto.css";

import {dtoLanguage} from "@/components/code/language/dto.ts";
import {vueLanguage} from "@/components/code/language/vue.ts";

Prism.languages.dto = dtoLanguage
Prism.languages.vue = vueLanguage

export const prism = Prism

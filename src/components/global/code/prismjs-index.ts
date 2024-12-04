import Prism from 'prismjs';
import "prismjs/themes/prism.css";
import "./language/dto.css";

import {dtoLanguage} from "@/components/global/code/language/dto.ts";
import {vueLanguage} from "@/components/global/code/language/vue.ts";

Prism.languages.dto = dtoLanguage
Prism.languages.vue = vueLanguage

export const prism = Prism

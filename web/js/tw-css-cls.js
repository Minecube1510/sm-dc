#!/usr/bin/env js
/* web/js/tw-css-cls.js */

/* Imports */
import { jsVar,
    jsTx, jsDoc,
    } from "./basis.js";
//
/**/


/* Rule - Tailwind Defaulter */
    /** For Auto-Define Tailwind "Class-W1" Map
     * @param {...string} twCls
     * @returns {Object.<string,string>}
     */
function twClasser (
    ...twCls
) {
    return ((Object).fromEntries((twCls)
        .map((v) => [ (v), (v), ])));
}
//
    /** ?
     * @param {...string} twFix
     * @param {?} 
     * @returns {?}
     */
export function tcRegulate (
    ...twFix
) {
    return ((jsTx).arr2Str(
    (twFix), (jsVar.dash)));
}
//
/**/


/* Storage - Classes */
export const
/*|*/
layout = {...twClasser(
        /* 1. Layout
     * {container}, {block}
     * {inline}, {flex}, {grid}
     * {hidden}
     *
     * {inline-block}, {inline-flex}, {inline-grid}
     *//*
*/
(`container`),(`block`),
(`inline`), (`flex`), (`grid`),
(`hidden`),
//
)},
position = {...twClasser(
        /* 2. Position
     * ==Position==
     * {absolute}, {relative}, {fixed}, {static}, {sticky}
     *
     * ==Inset==
     * {inset-*}
     *
     * ==Offset==
     * {right-*}, {bottom-*}, {left-*}, {top-*}
     *
     * ==Layer==
     * {z-*}
     *//*
*/
(`absolute`), (`relative`), (`fixed`),
(`static`), (`sticky`),
//
(`inset`),
//
(`right`),(`bottom`),(`left`),(`top`),
//
(`z`),
)},
flexGrid = {...twClasser(
        /* 3. Flex / Grid
     * {flex-*}, {grid-*}
     * {col-*}, {row-*}
     *
     * {flex-row-*}, {flex-col-*}
     * {grid-cols-*}, {grid-rows-*}
     *
     * {grow}, {shrink}
     *
     * {basis-*}
     * {order-*}
     *
     * {items-*}
     * {justify-*}
     * {content-*}
     * {place-*}
     * {self-*}
     *//*
*/
(`col`),(`row`),
(`grow`),(`shrink`),
//
(`basis`), (`order`),
//
(`items`), (`justify`), (`content`),
(`place`), (`self`),
)},
sizing = {...twClasser(
        /* 4. Sizing
     * {w-*}, {h-*}
     * {min-w-*},{max-w-*}, {min-h-*},{max-h-*}
     *
     * {aspect-*}
     *//*
*/
(`w`),(`h`),
//
(`aspect`),
)},
spacing = {...twClasser(
        /* 5. Spacing
     * {p-*}, {m-*}
     * {px-*},{py-*}, {mx-*},{my-*}
     * {pr/pb/pl/pt}, {mr/mb/ml/mt}
     *
     * {gap-*}
     * {space-x-*}, {space-y-*}
     * {gap-x-*}, {gap-y-*}
     *//*
*/
(`p`),(`m`),
//
(`px`),(`py`), (`mx`),(`my`),
//
(`pr`),(`pb`),(`pl`),(`pt`),
(`mr`),(`mb`),(`ml`),(`mt`),
//
(`space`), (`gap`),
)},
comp = {...twClasser(
        /* 6. Component
     * {border}, {text}, {bg},
     *
     * {ring}
     *//*
*/
(`border`), (`text`), (`bg`),
//
(`ring`),
)},
shape = {...twClasser(
        /* 7. Shape
     * {rounded}, {outline}
     *
     * {outline-offset}, {ring-offset}
     *
     * {border-*}, {rounded-*}, {outline-*}, {ring-*}
     * {divide-*}
     *//*
*/
(`rounded`), (`outline`),
//
(`divide`),
)},
colorize = {...twClasser(
        /* 8. Color
     * {from-*}, {via-*}, {to-*}
     *
     * {accent-*}, {caret-*}
     *
     * {fill-*}, {stroke-*}
     *//*
*/
(`from`), (`via`), (`to`),
//
(`accent`), (`caret`),
//
(`fill`), (`stroke`),
)},
typography = {...twClasser(
        /* 9. Typography
     * {font-*}
     * {text-size}, {text-align}
     *
     * {leading-*}, {tracking-*}
     *
     * {break-*}, {list-*}
     * {whitespace-*}
     *//*
*/
(`font`),
//
(`leading`), (`tracking`),
//
(`whitespace`), (`break`), (`list`),
)},
effects = {...twClasser(
        /* 10. Effects
     * {grayscale}, {invert}, {sepia}, {saturate}, {mix-blend}
     *
     * {shadow-*}, {opacity-*}, {blur-*}
     * {brightness-*}, {contrast-*}
     * {backdrop-*}
     *
     * {mix-blend-*}
     *//*
*/
(`grayscale`), (`invert`), (`sepia`),
(`saturate`), (`mix-blend`),
//
(`shadow`),(`opacity`),(`blur`), (`brightness`),(`contrast`),
(`backdrop`),
)},
transition = {...twClasser(
        /* 11. Transition / Animation
     * {transition-*}, {animate-*}
     * {ease-*}, {duration-*}
     * {delay-*}
     *//*
*/
(`transition`),(`animate`), (`ease`),(`duration`),
(`delay`),
)},
transform = {...twClasser(
        /* 12. Transform
     * {transform}
     *
     * {scale-*}
     * {translate-*}
     * {rotate-*}, {origin-*}
     * {skew-*}
     * 
     *//*
*/
(`transform`),
//
(`scale`), (`translate`), (`rotate`),(`origin`),
(`skew`),
)},
interaction = {...twClasser(
        /* 13. Interaction
     * {appearance-none}
     *
     * {pointer-events-*}
     * {cursor-*}, {select-*}, {resize-*}, {touch-*}
     *
     * {appearance-*}
     *//*
*/
(`cursor`), (`select`), (`resize`), (`touch`),
//
(`appearance`),
)},
states = {...twClasser(
        /* 14. States / Variants
     * ==Pseudo==
     * {hover:*}, {focus:*}, {active:*}
     * {disabled:*}
     * {focus-visible:*}
     *
     * ==Accessibility==
     * {aria:*}, {data:*}
     *
     * ==Responsive==
     * {sm:*}, {md:*}, {lg:*}, {xl:*}, {2xl:*}
     *//*
*/
(`hover`), (`focus`), (`active`), (`disabled`),
//
(`aria`), (`data`),
//
(`sm`), (`md`), (`lg`), (`xl`),
(`2xl`),
)}
;
/**/


/* Storage - Functer */
//...
//
/**/


/* END */
/**/

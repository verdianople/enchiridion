import {Attribute} from './attributes';
import {BasicTypes} from '../../../markdown';
import {Creature} from '../entity/creature';
import {toString} from 'mdast-util-to-string';


export interface Trait {
    name: string,
    description: string,
}

const traits: Attribute<'traits'> = {
    key: 'traits',
    aliases: ['creature traits', 'npc traits'],
    handle: (node: BasicTypes): Creature['traits'] => {
        const result: Creature['traits'] = [];
        if ('children' in node) {
            node.children.forEach(child => {
                if (child.type === 'pair') {
                    result.push({name: child.key, description: toString(node)})
                }
            })
        }
        return result;
    }
}

export default traits;

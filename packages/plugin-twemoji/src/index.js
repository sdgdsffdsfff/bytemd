import TwemojiView from './TwemojiView.svelte';
export default function twemoji(options) {
    // TODO: options
    return {
        shouldTransformElement(node) {
            return node.type === 'text';
        },
        component: TwemojiView
    };
}

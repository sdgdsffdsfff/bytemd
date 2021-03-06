// @ts-ignore
import Editor from './editor.svelte';
// @ts-ignore
import Viewer from './viewer.svelte';
import codemirror from 'codemirror';
import * as unified from 'unified';

import 'codemirror/lib/codemirror.css';
import 'tippy.js/dist/tippy.css';
import './index.css';

export { Editor, Viewer };
export { processMarkdown } from './utils';

type UnifiedProcessor = (x: unified.Processor) => unified.Processor;

export interface BytemdPlugin {
  /**
   * Customize Markdown parse by remark plugins:
   *
   * https://github.com/remarkjs/remark/blob/main/doc/plugins.md
   */
  remark?: UnifiedProcessor;
  /**
   * Customize HTML parse by rehype plugins:
   *
   * https://github.com/rehypejs/rehype/blob/main/doc/plugins.md
   */
  rehype?: UnifiedProcessor;
  /**
   * Side effect for editor, triggers when plugin list changes
   */
  editorEffect?(
    /**
     * CodeMirror instance
     */
    cm: codemirror.Editor,
    /**
     * Root element, `$('.bytemd')`
     */
    el: HTMLElement
  ): void | (() => void);
  /**
   * Side effect for viewer, triggers when HTML or plugin list changes
   */
  viewerEffect?(
    /**
     * Root element of Viewer, `$('.markdown-body')`
     */
    el: HTMLElement
  ): void | (() => void);
}

export interface EditorProps extends ViewerProps {
  /**
   * Editor display mode
   *
   * - split: edit on the left and preview on the right
   * - tab: click tabs to switch between edit and preview
   */
  mode?: 'split' | 'tab';
  /**
   * Components which should be added to toolbar
   */
  toolbarItems?: {
    tooltip?: string;
    bodyHtml: string;
  }[];
  /**
   * Debounce time (ms) for preview
   */
  previewDebounce?: number;
}

export interface ViewerProps {
  /**
   * Markdown text
   */
  value: string;
  /**
   * ByteMD plugin list
   */
  plugins?: BytemdPlugin[];
  /**
   * An option to change the default sanitize schema.
   *
   * Defaults to GitHub style sanitation except that the `class` attribute is allowed
   *
   * https://github.com/syntax-tree/hast-util-sanitize/blob/main/lib/github.json
   */
  sanitize?: (schema: any) => any;
}

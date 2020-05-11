import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { Props } from './types';
import { KeyType } from '../../../models/KeyType';
import styles from './styles.module.scss';
import parser from './parser';

let ticking = false;

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function safeTagsReplace(str: string) {
  return str.replace(/[&<>]/g, (tag: string) => tagsToReplace[tag] || tag);
}

const Editor: React.FC<Props> = (props) => {
  const { className, value } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [markup, setMarkup] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const code = event.keyCode || event.which;

    if (code === KeyType.TAB) {
      event.preventDefault();

      const TAB_SIZE = 2;
      document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));
    }

    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
  };

  const onScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (!ticking) {
      event.persist();
      requestAnimationFrame(() => {
        setScrollTop(-(event.target as HTMLTextAreaElement).scrollTop || 0);
        setScrollLeft(-(event.target as HTMLTextAreaElement).scrollLeft || 0);
        ticking = false;
      });
    }
    ticking = true;
  };

  useEffect(() => {
    if (value) {
      const safe = safeTagsReplace(value);
      const colorized = parser(safe, 'js');
      setMarkup(colorized);
    }
  }, [value]);

  return (
    <div
      className={classNames(
        styles.block,
        className
      )}
    >
      <div className={styles.container}>
        <textarea
          autoCapitalize="off"
          autoCorrect="off"
          className={styles.textarea}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onScroll={onScroll}
          ref={textAreaRef}
          spellCheck="false"
          value={value}
          wrap="off"
        />
        <div
          className={styles.editor}
          dangerouslySetInnerHTML={{
            __html: markup
          }}
          style={{ transform: `translate(${scrollLeft}px, ${scrollTop}px)` }}
        />
      </div>
    </div>
  );
};

export default Editor;
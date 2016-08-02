'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, CompositeDecorator, RichUtils,  ContentState, Entity, convertToRaw, convertFromRaw} from 'draft-js';



class ChordsheetEditor extends React.Component {
    constructor() {
        super();
        const compositeDecorator = new CompositeDecorator([
            {
                strategy: chordStrategy,
                component: ChordSpan
            },
            {
                strategy: verseChorusStrategy,
                component: VerseChorusSpan
            }
        ]);

        this.state = {
            editorState: EditorState.createEmpty(compositeDecorator)
        };

        this.focus = () => this.refs.chordsEditor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.createChordsBlock  = () => console.log('createChordsBlock');
        this.createVersusBlock  = () => console.log('createVersusBlock');
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        ref="chordsEditor"
                        spellCheck={true}
                        />
                </div>
                <input
                    onClick={this.createVersusBlock}
                    style={styles.button}
                    type="button"
                    value="Verse and horus block"
                    />
                <input
                    onClick={this.createChordsBlock}
                    style={styles.button}
                    type="button"
                    value="Chords block"
                    />
            </div>
        );
    }
}

const CHORD_REGEX =  /(?:^|\b)([ABDEG]b?|[ACDFG]#?)((([Mm](aj|in)?|\+|aug|dim|°)?6?)|(dom|ø?))?7?(?=\b|$)/g;
// /([ABDEG]♭?|[ACDFG]♯?)((([Mm](aj|in)?|\+|aug|dim|°)?6?)|(dom|ø?))?7?$/
// /([ABDEG]♭?|[ACDFG]♯?)((([Mm](aj|in)?|\+|aug|dim|°)?6?)|(dom|ø?))?7?$/g
const VERSE_CHORUS_REGEX =  /(VERSE|CHORUS)/g;

function chordStrategy(contentBlock, callback) {
    findWithRegex(CHORD_REGEX, contentBlock, callback);
}

function verseChorusStrategy(contentBlock, callback) {
    findWithRegex(VERSE_CHORUS_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const ChordSpan = (props) => {
    return <span {...props} style={styles.chord}>{props.children}</span>;
};

const VerseChorusSpan = (props) => {
    console.log(props);
    return <span {...props} style={styles.verseChorus}>{props.children}</span>;
};

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: '90%',
        hight: 200
    },
    editor: {
        border: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        minHeight: 40,
        padding: 10
    },
    button: {
        marginTop: 10,
        textAlign: 'center'
    },
    chord: {
        color: 'rgba(98, 177, 254, 1.0)',
        fontWeight: '600',
        direction: 'ltr'
    },
    verseChorus: {
        color: 'rgba(255,0,0, 0.6)',
        fontWeight: '600',
        direction: 'ltr'
    }
};
//

export default ChordsheetEditor;
import React from 'react';
import ReactDOM from 'react-dom';
import LoadLevel from './LoadLevel'


describe("LoadLevel component", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoadLevel  children={() => {}} level={{}} goBack={() => {}} />, div);
    });
});

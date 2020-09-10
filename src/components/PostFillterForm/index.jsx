import React,{useState,useRef} from 'react';
import PropTypes from 'prop-types';

PostFillterForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFillterForm.defaultProps={
    onSubmit: null
}
function PostFillterForm(props) {
    const {onSubmit}=props
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef= useRef(null);
    function handleSearchTermChange(e){
        const value= e.target.value;
        if(!onSubmit) return;
        setSearchTerm(value);
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current= setTimeout(() => {
            const formValues={
                searchTerm:value
            }
            onSubmit(formValues);
        }, 300);    
    }
    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchTermChange}></input>
        </div>
    );
}

export default PostFillterForm;
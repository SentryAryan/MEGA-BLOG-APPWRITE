import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

const RTE = ({ name, control, label, defaultValue = '' }) => {
    const editorRef = useRef(null);

    const plugins = [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'emoticons', 'help'
    ]
    const toolbar = 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={defaultValue}
                        value={value}
                        onEditorChange={onChange}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: plugins,
                            toolbar: toolbar,
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            promotion: false,
                            branding: false,
                            convert_urls: false,
                            sandbox_iframes: true,
                            convert_unsafe_embeds: true
                        }}
                    />
                )}
            />
        </div>
    )
}

export default RTE
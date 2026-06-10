import React from 'react'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import DoubleColumnTemplate from '../assets/templates/DoubleColumnTemplate'
import CreativeTemplate from '../assets/templates/CreativeTemplate'
import TechTemplate from '../assets/templates/TechTemplate'


const ResumePreview = ({data, template, accentColor, classes = " ", atsMode = false}) => {

    const displayAccent = atsMode ? "#111827" : accentColor;

    const renderTemplate = ()=> {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;

            case "minimal":
                return <MinimalTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;
            
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;
            
            case "double-column":
                return <DoubleColumnTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;
            
            case "creative":
                return <CreativeTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;

            case "tech":
                return <TechTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;

            default:
                return <ClassicTemplate data={data} accentColor={displayAccent} atsMode={atsMode}/>;
            
        }
    }

  return (
    <div className={`w-full ${atsMode ? 'bg-white' : 'bg-gray-100'}`}>
        <div id='resume-preview' className={'bg-white w-full border border-gray-200 print:shadow-none print:border-none' + classes}>
        {renderTemplate()}
        </div>

        <style jsx>
            {`
            @page {
                size: letter;
                margin: 0;
            }
            .break-inside-avoid {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            @media print {
                html, body {
                width: 8.5in;
                height: 11in;
                overflow: hidden;
                }
                body * {
                    visibility: hidden;
                }
                #resume-preview, #resume-preview * {
                visibility: visible;
                }
                #resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border: none !important;
                }
            }
            `}
        </style>
    </div>
  )
}

export default ResumePreview
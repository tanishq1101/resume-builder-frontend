import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {

const [isOpen, setIsOpen] = useState(false)

const templates = [
  {
    id: "classic",
    name: "Classic",
    preview: "A clean, traditional resume format with clear sections and professional typography",
    layout: "classic"
  },
  {
    id: "double-column",
    name: "Double-Column Professional",
    preview: "Premium split layout containing custom achievements, training, and interests lists.",
    layout: "double"
  },
  {
    id: "modern",
    name: "Modern",
    preview: "Sleek design with strategic use of color and modern font choices",
    layout: "modern"
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    preview: "Minimal design with a single image and clean typography",
    layout: "image"
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "Ultra-clean design that puts your content front and center",
    layout: "minimal"
  },

]

const renderThumbnail = (layout) => {
  switch (layout) {
    case "double":
      return (
        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2 space-y-1'>
            <div className='h-2 rounded bg-(--brand-primary-light)/30' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
          <div className='space-y-1'>
            <div className='h-2 rounded bg-(--brand-primary)/60' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
        </div>
      )
    case "modern":
      return (
        <div className='space-y-2'>
          <div className='h-3 rounded bg-(--brand-primary)/80' />
          <div className='grid grid-cols-2 gap-2'>
            <div className='space-y-1'>
              <div className='h-2 rounded bg-gray-200' />
              <div className='h-2 rounded bg-gray-200' />
            </div>
            <div className='space-y-1'>
              <div className='h-2 rounded bg-gray-200' />
              <div className='h-2 rounded bg-gray-200' />
            </div>
          </div>
        </div>
      )
    case "image":
      return (
        <div className='grid grid-cols-3 gap-2'>
          <div className='space-y-2'>
            <div className='size-6 rounded-full bg-(--brand-primary)/60' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
          <div className='col-span-2 space-y-1'>
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
        </div>
      )
    case "minimal":
      return (
        <div className='space-y-2'>
          <div className='h-2 w-3/5 rounded bg-gray-200' />
          <div className='space-y-1'>
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
        </div>
      )
    default:
      return (
        <div className='space-y-2'>
          <div className='h-2 rounded bg-(--brand-primary)/60' />
          <div className='space-y-1'>
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
            <div className='h-2 rounded bg-gray-200' />
          </div>
        </div>
      )
  }
}

  return (
    <div className='relative'>
      <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-(--brand-primary) bg-linear-to-br from-(--brand-primary-soft)
      to-(--brand-primary-weak) ring-(--brand-primary-light) hover:ring transition-all px-3 py-2 rounded-lg '>
        <Layout size={14}/> <span className='max-sm:hidden'>Template</span>
      </button>
      {isOpen && (
        <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border 
        border-gray-200 shadow-sm'>
          {templates.map((template)=>(
            <div key={template.id} onClick={()=> {onChange(template.id); setIsOpen(false)}}
            className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? 
              "border-(--brand-primary) bg-(--brand-primary-soft)" :
              "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
            }`}>
                {selectedTemplate === template.id && (
                  <div className='absolute top-2 right-2'>
                    <div className='size-5 bg-(--brand-primary) rounded-full flex items-center justify-center'>
                      <Check className='w-3 h-3 text-white'/>
                    </div>
                  </div>
                )}

                <div className='space-y-2'>
                  <h4 className='font-medium text-gray-800'>{template.name}</h4>
                  <div className='rounded border border-gray-200 bg-white p-2 shadow-xs'>
                    {renderThumbnail(template.layout)}
                  </div>
                  <div className='mt-1 pt-2 bg-(--brand-primary-soft) rounded text-xs text-gray-500 italic'>{template.preview}</div>
                </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
type SelectOption = {
    label : string,
    value : string
}

type SelectProps = {
    options : SelectOption[],
    value?: SelectOption,
    onChange : (value : SelectOption | undefined) => void
   
}

import React from 'react'

export default function Select({options, value, onChange } : SelectProps) {
  return (
    <div>
        
    </div>
  )
}

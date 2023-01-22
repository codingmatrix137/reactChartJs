import { ChartData, ChartOptions } from "chart.js";
import { useEffect } from "react";
import { useState } from "react";
import classes from './Textarea.module.css'
interface TextareaProps {
    options: ChartOptions<"bar">;
    data: ChartData<"bar">;
    onOptionChange: (newOption: ChartOptions<"bar">) => void;
    onDataChange: (newData: ChartData<"bar">) => void;
  }
  
  const Textarea: React.FC<TextareaProps> = (props) => {
    const [options, setOptions] = useState(JSON.stringify(props.options,null,2));
    const [data, setData] = useState(JSON.stringify(props.data,null,2));
    
    useEffect(() => {
        setOptions(JSON.stringify(props.options,null,2))
        setData(JSON.stringify(props.data,null,2))
    },[props.options, props.data])
    const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setOptions(e.target.value);
      props.onOptionChange(JSON.parse(e.target.value));
    }
  
    const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData(e.target.value);
      props.onDataChange(JSON.parse(e.target.value));
    }
  
    return (
      <div>
        <textarea 
          className={`${classes.textarea} ${classes.vs}`}
          placeholder="Options" 
          value={options} 
          onChange={handleOptionChange} 
        />
        <textarea 
          className={`${classes.textarea} ${classes.vs}`}
          placeholder="Data" 
          value={data}
          onChange = {handleDataChange}
          /> 
          </div>)
  }
  export default Textarea;
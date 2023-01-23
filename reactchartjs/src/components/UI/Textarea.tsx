import { ChartData, ChartOptions } from "chart.js";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { setOptions } from "react-chartjs-2/dist/utils";
import { OptionsContext, DataContext } from "../charts/BarChartContext";
import classes from './Textarea.module.css'
interface TextareaProps {
    onOptionChange: (newOption: ChartOptions<"bar">) => void;
    onDataChange: (newData: ChartData<"bar">) => void;
  }
  
  const Textarea: React.FC<TextareaProps> = (props) => {
    const optionsCtx = useContext(OptionsContext);
    const dataCtx = useContext(DataContext);
    const [options, setOptions] = useState(JSON.stringify(optionsCtx, null, 2));
    const [data, setData] = useState(JSON.stringify(dataCtx, null, 2));
    
    useEffect(() => {
      setOptions(JSON.stringify(optionsCtx,null,2))
      setData(JSON.stringify(dataCtx,null,2))
  },[optionsCtx, dataCtx])
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
import { useEffect, useState } from "react"
import { Layout } from "./layout/Layout"
import { Question, ResponseQuestions } from "./interface/response-questions";
import { Form } from "./components/Form/Form";


export const App = () => {
  const [formQuestions, setFormQuestions] = useState<Question[]>([]);

  //Llamada a la API para obtener las preguntas
  const callQuestions = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/5320545a-7539-4c71-9730-8f9f4de3aec6', {
        method: 'GET',
        redirect: "follow",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textResponse = await response.text()
      const correctedResponse = textResponse
        .replace(/'/g, '"') //Reemplazar comillas simples por comillas dobles
        .replace(/(\w+)\s*:/g, '"$1":') //Agregar comillas dobles a las propiedades
        .replace(/,(?=\s*?[\]}])/g, ''); //Eliminar la coma al final del valor 'value' en todos los objetos

      const data: ResponseQuestions = JSON.parse(correctedResponse);
      setFormQuestions(data?.data)
      
    }
    catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    callQuestions();
  }, [])
  
  return (
    <Layout>
      {/* //Pasamos las preguntas al componente Form */}
      <Form questions={formQuestions} />
    </Layout>
  )
}


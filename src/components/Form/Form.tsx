import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Question } from '../../interface/response-questions';
import { useState } from 'react';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';

export const Form = ({ questions }: { questions: Question[] }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FieldValues | null>(null);

  //Función para enviar el formulario
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    setFormData(data);
  }

  //Función para cerrar el dialogo
  const closeDialog = () => {
    setIsLoading(false);
    reset();
    setFormData(null);
  }

  // LLegan todos los datos de la api como disabled: true
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question, index) => (
          <div key={index}>
            {question.type === 'TextInput' ? (
              <TextField
                margin='normal'
                label={question.label}
                variant='outlined'
                required={question.isRequired === true}
                disabled={question.disabled === true}
                {...register(question.name, { required: true })}
                error={!!errors[question.name]}
                helperText={errors[question.name] && "Este campo es requerido"}
              />
            ) : question.type === 'TextEmail' ? (
              <TextField
                margin='normal'
                label={question.label}
                variant='outlined'
                type="email"
                required={question.isRequired === true}
                disabled={question.disabled === true}
                {...register(question.name, { required: true })}
                error={!!errors[question.name]}
                helperText={errors[question.name] && "Este campo es requerido"}
              />
            ) : question.type === 'Textarea' ? (
              <TextField
                label={question.label}
                variant='outlined'
                multiline
                rows={4}
                required={question.isRequired === true}
                disabled={question.disabled === true}
                {...register(question.name, { required: true })}
                error={!!errors[question.name]}
                helperText={errors[question.name] && "Este campo es requerido"}
              />
            ) : null}
          </div>
        ))}
        <Button type="submit" variant="contained" disabled={isLoading}>Enviar Formulario</Button>
      </form>
      <Dialog open={isLoading}>
        <DialogTitle>Formulario Enviado</DialogTitle>
        <DialogContent>
          {formData && (
            <ul>
              {Object.entries(formData).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          )}
          <Button type="submit" variant="contained" onClick={closeDialog} style={{ marginTop: "16px" }}>Ok!</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

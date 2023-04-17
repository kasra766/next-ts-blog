import { memo, useReducer, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { isAxiosError } from "axios";

import { registerEmail } from "@/services";
import type { IProps } from "@/pages/events/[cat]";



const initialData={
  message:"",
  color:""
}

function reducer(current:typeof initialData,update:Partial<typeof initialData>){
  return {
    ...current,
    ...update
  }
}

export const SingleEvent = memo(function ({
  data,
}: {
  data: IProps["data"][number];
}) {
  const { description, image, title } = data;
  const router = useRouter();
  const { id } = router.query;
  const [messageDetail, setMessage] = useReducer(reducer,initialData);
  const inputEmail = useRef<HTMLInputElement>(null);
  
  const { mutate } = useMutation(registerEmail, {
    onError(error, variables, context) {
      if (isAxiosError(error)) {
        setMessage({message:error.response?.data.message,color:"red"});
      }
    },
    onSuccess(data, variables, context) {
      setMessage({message:data.data.message,color:"green"});
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputEmail.current?.value;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email?.match(validRegex)) {
      setMessage({message:"Please introduce a correct email address",color:"red"});
      return;
    }

    try {
      if (email) {
        mutate({ email, eventId: id as string });
        inputEmail.current.value = "";
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>{id}</h1>
      <Image src={image} alt={title} width={300} height={300} />
      <h2>{title}</h2>
      <p>{description}</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit">Submit</button>
      </form>
      <p style={{ color: messageDetail.color }}>{messageDetail.message}</p>
    </div>
  );
});

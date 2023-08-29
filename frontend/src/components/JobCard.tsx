import { UserContext } from "../contexts/UserContext";
import { APIResponse, Job } from "../types/types";
import { useContext, useEffect, useState } from "react";
import socket from "../modules/socket";
const JobCard = ({
  position,
  company,
  createdAt,
  status,
  updatedAt,
  _id,
}: Job) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [response, setResponse] = useState<APIResponse>({
    ok: false,
    status: 0,
    statusText: "",
  });
  const [modifiedFields, setModifiedFields] = useState({
    position: "",
    company: "",
    status: "",
  });

  const updateJob = async () => {
    const keys = ["position", "company", "status"];
    const updatedFields: any = {};

    for (let i = 0; i < 3; i++) {
      const key = keys[i];
      if (modifiedFields[key as keyof typeof modifiedFields])
        updatedFields[key] = modifiedFields[key as keyof typeof modifiedFields];
    }

    const response = await fetch(`http://localhost:3001/api/v1/jobs/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
      },
      body: JSON.stringify(updatedFields),
    })
    
    setResponse(response)
    const updatedJob = await response.json()    
    socket.emit("updateJob", updatedJob)

    setIsUpdating(false)
  };
  const date = new Date(createdAt);
  const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  if (response.status == 204) {
    return (
      <div className="items-center w-[320px] bg-[#eaeaea] flex h-36 outline outline-1 p-2 m-2">
        <div className="mx-auto text-xl">Deleted</div>
      </div>
    );
  }
  return (
    <div key={_id} className="w-[320px] text-[#333] outline-[2px] outline rounded-sm bg-[#eaeaea]  p-2 m-2">
      <div className="flex justify-between">
        <p>
          <span hidden={isUpdating}>{modifiedFields.position ? modifiedFields.position : position}</span>
          <span hidden={!isUpdating}>
            <input
            className="rounded-md max-w-[150px] ml-1"
              type="text"
              onChange={(e) =>
                setModifiedFields({
                  ...modifiedFields,
                  position: e.target.value,
                })
              }
              hidden={!isUpdating}
              placeholder=" Position"
            />
          </span>
        </p>
        <p hidden={isUpdating} className="font-semibold">
          {modifiedFields.company ? modifiedFields.company : company}
        </p>
        <span hidden={!isUpdating}>
          <input
          className="rounded-md max-w-[150px] ml-1"
            type="text"
            onChange={(e) =>
              setModifiedFields({ ...modifiedFields, company: e.target.value })
            }
            hidden={!isUpdating}
            placeholder=" Company"
          />
        </span>
      </div>
      <div className="my-4 justify-between flex">
        <button
          onClick={() => {
            if (!isUpdating) {
              setIsUpdating(true);
              return;
            } else {
              updateJob();
            }
          }}
          className="inline-block rounded bg-primary p-2 px-4 font-medium uppercase leading-normal text-white bg-blue-500"
        >
          Update
        </button>
        <button
          hidden={!isUpdating}
          className="inline-block rounded bg-primary p-2 px-4 font-medium uppercase leading-normal text-white bg-blue-500"
          onClick={async () => {
            const response = await fetch(
              `http://localhost:3001/api/v1/jobs/${_id}`,
              {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
                },
              }
            );
            setResponse(response)
            setIsUpdating(false)
            setTimeout(() => {
              setResponse({...response, status: 0})
            }, 1500)
            socket.emit("deleteJob", _id)
          }}
        >
          Delete
        </button>
        <button
          hidden={!isUpdating}
          className="inline-block rounded bg-primary p-2 px-4 font-medium uppercase leading-normal text-white bg-blue-500"
          onClick={() => setIsUpdating(false)}
        >
          Cancel
        </button>
      </div>
      <div className="flex justify-between">
        
        <select
          className="outline rounded-sm p-1 outline-slate-700 outline-2"
          disabled={!isUpdating}
          defaultValue={modifiedFields.status ? modifiedFields.status : status}
          onChange={(e) =>
            setModifiedFields({ ...modifiedFields, status: e.target.value })
          }
        >
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
        <p>{dateString}</p>

      </div>
    </div>
  );
};
export default JobCard;

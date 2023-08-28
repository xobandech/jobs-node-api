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
  const { currentUser } = useContext(UserContext);
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

    await fetch(`http://localhost:3001/api/v1/jobs/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => response.json())
      .then((job) => console.log(job))
      .catch((error) => console.error(error))
      .finally(() => setIsUpdating(false));
  };
  const date = new Date(createdAt);
  const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  if (response.status == 204) {
    return (
      <div className="items-center flex h-36 outline outline-1 p-2 m-2">
        <div className="mx-auto text-xl">Deleted</div>
      </div>
    );
  }
  return (
    <div key={_id} className="max-w-[320px] outline outline-1 p-2 m-2">
      <div className="flex justify-between">
        <p>
          Pos: <span hidden={isUpdating}>{position}</span>
          <span hidden={!isUpdating}>
            <input
              type="text"
              onChange={(e) =>
                setModifiedFields({
                  ...modifiedFields,
                  position: e.target.value,
                })
              }
              hidden={!isUpdating}
              placeholder={`${position}`}
            />
          </span>
        </p>

        <p>{dateString}</p>
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
          className="w-20 h-10 rounded-md bg-violet-200"
        >
          Update
        </button>
        <button
          hidden={!isUpdating}
          className="w-20  h-10 rounded-md bg-violet-200"
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
          className="w-20  h-10 rounded-md bg-violet-200"
          onClick={() => setIsUpdating(false)}
        >
          Cancel
        </button>
      </div>
      <div className="flex justify-between">
        <p hidden={isUpdating} className="font-semibold">
          {company}
        </p>
        <span hidden={!isUpdating}>
          <input
            type="text"
            onChange={(e) =>
              setModifiedFields({ ...modifiedFields, company: e.target.value })
            }
            hidden={!isUpdating}
            placeholder={company}
          />
        </span>
        <select
          className="outline outline-slate-700 outline-2"
          disabled={!isUpdating}
          defaultValue={status}
          onChange={(e) =>
            setModifiedFields({ ...modifiedFields, status: e.target.value })
          }
        >
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
      </div>
    </div>
  );
};
export default JobCard;

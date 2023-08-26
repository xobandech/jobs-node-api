import { UserContext } from "../contexts/UserContext";
import { Job } from "../types/types";
import { useContext, useEffect, useState } from "react";
const JobCard = ({
  position,
  company,
  createdAt,
  status,
  updatedAt,
  _id,
}: Job) => {
  const { currentUser } = useContext(UserContext);
  
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
      .catch((error) => console.error(error)).finally(() => setIsUpdating(false));
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const date = new Date(createdAt);
  const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  useEffect(() => {
    console.log();
  }, [modifiedFields]);
  return (
    <div className="max-w-[320px] outline outline-1 p-2 m-2">
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
      <div className="my-4">
        <button
          onClick={() => {
            if (!isUpdating) {
              setIsUpdating(true);
              return;
            } else {
              updateJob();
            }
          }}
          className="w-20 mx-auto h-10 rounded-md bg-violet-200"
        >
          Update
        </button>
        <button
          hidden={!isUpdating}
          className="w-20 mx-auto h-10 rounded-md bg-violet-200"
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

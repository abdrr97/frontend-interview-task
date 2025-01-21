import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api/api";
import CustomLoader from "./CustomLoader";
import CustomSelect from "./CustomSelect/CustomSelect";
import SensorGroups from "./SensorGroups";
import Summary from "./Summary";
// import SensorGroups from "./SensorGroups";

export default function SensorExplorer() {
  const [selectedSensor, setSelectedSensor] = useState<string | undefined>(
    undefined,
  );
  const {
    isPending,
    data: groupsSensors,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["sensor-groups"],
    queryFn: api.fetchGroupsBySensor,
  });

  const onOptionClick = (sensor: string) => {
    setSelectedSensor(sensor);
  };

  const selectOptions = groupsSensors?.groupsBySensor
    ? Object.keys(groupsSensors?.groupsBySensor)
    : [];

  return (
    <>
      {/* // TODO: continue from here */}

      {isPending && (
        <div className="loader-wrapper">
          <CustomLoader />
        </div>
      )}

      {isError && <div>Error: {error?.message ?? "Something went wrong"}</div>}

      {isSuccess && (
        <div style={{ maxWidth: "550px", margin: "0 auto" }}>
          <Summary
            customer={groupsSensors?.customer}
            groupsBySensor={groupsSensors?.groupsBySensor}

          />

          <div
            style={{
            display: "flex",
              alignItems: "center",
              gap: "16px",
              margin: "16px 0",
              justifyContent: "center",
            }}
          >
            <span>Sensor </span>
            <CustomSelect
              style={{ maxWidth: "150px" }}
              selectedOption={selectedSensor}
              placeholder="Sensor"
              options={selectOptions}
              onOptionClick={onOptionClick}
            />
            <span>is composed by:</span>
          </div>
        </div>
      )}

      {/* // TODO: Uncomment once part 1 is complete */}
      {isSuccess && selectedSensor && (
        <SensorGroups
          selectedSensor={selectedSensor}
          groupsSensors={groupsSensors!}
        />
      )}
    </>
  );
}

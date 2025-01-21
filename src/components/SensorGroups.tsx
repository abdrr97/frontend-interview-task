import CustomList from "./CustomList";

type SensorGroupsProps = {
  groups: string[];
  selectedSensor: string;
};

export default function SensorGroups({
  selectedSensor,
  groups,
}: SensorGroupsProps) {
//   const sensorGroups = groupsSensors.groupsBySensor[selectedSensor];
  const groupPrefix = selectedSensor.split("_")[0];

  return (
    <div style={{textAlign:'center'}}>
      <CustomList listData={groups} style={{   margin: '16px 0' }} />
      <div style={{ height: "4px" , backgroundColor: 'blue' , margin: '16px 0'}} />
      <div>
        Sensor prefixed with{" "}
        <strong>{groupPrefix}</strong> contains a
        total of{" "}
        <strong>{groups.length}</strong>{" "}
        groups
      </div>
    </div>
  );
}

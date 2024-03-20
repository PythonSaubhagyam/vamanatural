import { Button } from "@chakra-ui/react";

export default function TimerButton({ handleTimerToggle, row }) {
  return (
    <Button
      colorScheme={row.running_task.running ? "red" : "brand"}
      size="xs"
      onClick={handleTimerToggle}
    >
      {row.running_task.running ? "Stop" : "Start"} Timer
    </Button>
  );
}

import { HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckItem = ({ entry }: { entry: HealthCheckEntry }): JSX.Element => {

  interface HealthCheck {
    iconColor: string;
    rating: string;
  }

  const healthCheckResult = (): HealthCheck => {
    const healthRating = entry.healthCheckRating;
    let iconColor;
    let rating;
    switch (healthRating) {
      case HealthCheckRating.Healthy:
        iconColor = "#32c11f";
        rating = "Healthy";
        break;
      case HealthCheckRating.LowRisk:
        iconColor = "#f7f70c";
        rating = "Low Risk";
        break;
      case HealthCheckRating.HighRisk:
        iconColor = "#ff0000";
        rating = "High Risk";
        break;
      case HealthCheckRating.CriticalRisk:
        iconColor = "#000000";
        rating = "Critical Risk";
        break;
      default:
        throw new Error("Invalid rating");
    }

    return { iconColor, rating };
  };

  const healthCheck = healthCheckResult();

  return (
    <>
      <FavoriteIcon sx={{ color: healthCheck.iconColor }} />
      <em>{ healthCheck.rating }</em>
    </>
  );
};

export default HealthCheckItem;

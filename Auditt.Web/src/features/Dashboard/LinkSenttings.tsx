import { SimpleNavItem } from "../../shared/components/Navigation/SimpleNavItem";

export const LinkSettings = () => {
  return (
    <div className="flex ">
      <SimpleNavItem to="/Users" title="Usuario" />
      <SimpleNavItem to="/Roles" title="Roles" />
      <SimpleNavItem to="/Scales" title="Escalas" />
    </div>
  );
};

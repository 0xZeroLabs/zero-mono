import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SBTModule = buildModule("SBTModule", (m) => {
  const omPassport = m.contract("omPassport");

  return { omPassport };
});

export default SBTModule;
module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const argsGreeter = ["Greeting set from ./deploy/Greeter.ts"];

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Greeter", {
    from: deployer,
    // gas: 4000000,
    args: argsGreeter,
  });
};

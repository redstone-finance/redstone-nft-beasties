export async function handle(state, action) {
  const DEFAULT_LIMIT = 100;

  switch (action.input.function) {

    case "name": {
      return { result: state.name };
    }

    case "getCurrentValue": {
      return { result: state.values[0] || {
        value: null,
      } };
    }

    case "getLatestChanges": {
      const limit = action.input.data.limit || DEFAULT_LIMIT;
      return { result: state.values.slice(0, Math.min(limit, state.values.length)) };
    }

    case "saveNewValue": {
      const value = action.input.data.value;
      const timestamp = SmartWeave.block.timestamp;
      const updatedBy = action.caller;

      state.values.unshift({
        value,
        timestamp,
        updatedBy,
      });

      return { state };
    }

    default: {
      throw new ContractError(
        `Unsupported contract function: ${action.input.function}`);
    }
  }
}

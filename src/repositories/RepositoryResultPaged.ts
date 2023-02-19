/**
 * @summary Generic paginated result for repositories that allows decoupling
 * from Sequelize Models directly within persistence related methods.
 * Returns indicator if the operation was successful in the boolean "success".
 * Returns the actual payload of data in "data" having type specified in DataType.
 * Returns any errors in "errors" having type specified in ErrorType.
 */
export class RepositoryResultPaged<DataType, ErrorType> {
  public success: boolean;
  private error: ErrorType;
  private data: DataType;

  private constructor(success: boolean, data: DataType, error: ErrorType) {
    if (success && error) {
      throw new Error("Successful result must not contain an error");
    } else if (!error) {
      throw new Error("Unsuccessful result must contain an error");
    }

    this.success = success;
    this.data = data;
    this.error = error;
  }

  public static ok<DataType>(
    data: DataType
  ): RepositoryResultPaged<DataType, undefined> {
    return new RepositoryResultPaged(true, data, undefined);
  }

  public static fail<ErrorType>(
    error: ErrorType
  ): RepositoryResultPaged<undefined, ErrorType> {
    return new RepositoryResultPaged(false, undefined, error);
  }

  public getError(): ErrorType {
    if (!this.error) {
      throw new Error("Result does not contain an error");
    }
    return this.error;
  }

  public getData(): DataType {
    if (!this.data) {
      throw new Error("Result does not contain data");
    }
    return this.data;
  }
}

export default RepositoryResultPaged;

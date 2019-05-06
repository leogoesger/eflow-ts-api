import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IMemberPaper {
  id: number;
  memberId: number;
  paperId: number;
}

interface IMemberPaperExtend extends Model {
  id: number;
  memberId: number;
  paperId: number;
}

type MemberPaperModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IMemberPaperExtend) & {
    associate: (model: IDB) => any;
  };

const memberPaperFactory = sequalize => {
  const MemberPaper = <MemberPaperModel>sequalize.define('MemberPaper', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    memberId: DataTypes.INTEGER,
    paperId: DataTypes.INTEGER,
  });

  return MemberPaper;
};

export { memberPaperFactory, MemberPaperModel };

import React, { useMemo } from 'react';
import { Voter } from '../types';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface StatisticsProps {
  voters: Voter[];
}

const ProgressBar: React.FC<{ percentage: number; colorClass: string }> = ({ percentage, colorClass }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
        className={`${colorClass} h-2.5 rounded-full`}
        style={{ width: `${percentage}%` }}
        ></div>
    </div>
);

const Statistics: React.FC<StatisticsProps> = ({ voters }) => {
  const stats = useMemo(() => {
    const affiliated = voters.filter(v => v.afiliadoUGT);
    const nonAffiliated = voters.filter(v => !v.afiliadoUGT);

    const affiliatedVoted = affiliated.filter(v => v.haVotado).length;
    const nonAffiliatedVoted = nonAffiliated.filter(v => v.haVotado).length;

    const affiliatedPercentage = affiliated.length > 0 ? (affiliatedVoted / affiliated.length) * 100 : 0;
    const nonAffiliatedPercentage = nonAffiliated.length > 0 ? (nonAffiliatedVoted / nonAffiliated.length) * 100 : 0;

    const centers = [...new Set(voters.map(v => v.centroVotacion))];
    const turnoutByCenter = centers.map(center => {
        const centerVoters = voters.filter(v => v.centroVotacion === center);
        const votedCount = centerVoters.filter(v => v.haVotado).length;
        const percentage = centerVoters.length > 0 ? (votedCount / centerVoters.length) * 100 : 0;
        return {
            name: center,
            voted: votedCount,
            total: centerVoters.length,
            percentage,
        };
    }).sort((a,b) => a.name.localeCompare(b.name));

    return {
      affiliatedStats: { total: affiliated.length, voted: affiliatedVoted, percentage: affiliatedPercentage },
      nonAffiliatedStats: { total: nonAffiliated.length, voted: nonAffiliatedVoted, percentage: nonAffiliatedPercentage },
      turnoutByCenter,
    };
  }, [voters]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Estadísticas de la Jornada</h2>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-3">Participación por Afiliación</h3>
        <div className="space-y-3">
            <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-yellow-800 dark:text-yellow-300">Afiliados</span>
                    <span className="text-gray-500 dark:text-gray-400">{stats.affiliatedStats.voted} / {stats.affiliatedStats.total}</span>
                </div>
                <ProgressBar percentage={stats.affiliatedStats.percentage} colorClass="bg-yellow-400"/>
            </div>
             <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-gray-800 dark:text-gray-300">No Afiliados</span>
                    <span className="text-gray-500 dark:text-gray-400">{stats.nonAffiliatedStats.voted} / {stats.nonAffiliatedStats.total}</span>
                </div>
                <ProgressBar percentage={stats.nonAffiliatedStats.percentage} colorClass="bg-gray-400"/>
            </div>
        </div>
      </div>
        
      <div>
        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300 mb-3">Participación por Centro</h3>
        <div className="space-y-4">
            {stats.turnoutByCenter.map(center => (
                <div key={center.name}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-gray-800 dark:text-gray-300 truncate pr-2">{center.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{center.voted} / {center.total}</span>
                    </div>
                    <ProgressBar percentage={center.percentage} colorClass="bg-blue-600"/>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Statistics;
export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	aromaveil: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'flinch', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Aroma Veil",
		rating: 2,
		num: 165,
	},
	battery: {
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Battery",
		rating: 0,
		num: 217,
	},
	corrosion: {
		// Implemented in sim/pokemon.js:Pokemon#setStatus
		name: "Corrosion",
		rating: 2.5,
		num: 212,
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
	},
	emergencyexit: {
        inherit: true,
        onEmergencyExit(target) {
            if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
            for (const side of this.sides) {
                for (const active of side.active) {
                    active.switchFlag = false;
                }
            }
            target.switchFlag = true;
            this.add('-activate', target, 'ability: Emergency Exit');
            target.emergencyExiting = true;
        },
        onSwitchOut(pokemon) {
            if(pokemon.emergencyExiting)
				pokemon.heal(pokemon.baseMaxhp / 4);
        },
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},
};

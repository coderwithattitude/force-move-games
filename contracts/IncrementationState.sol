pragma solidity ^0.4.18;

import './CommonState.sol';

library IncrementationState {
  enum StateType { Start, Final }

  // IncrementationGame State Fields
  // (relative to gamestate offset)
  // ==============================
  // [  0 -  31] enum stateType
  // [ 32 -  63] uint256 aBal
  // [ 64 -  95] uint256 bBal
  // [ 96 - 127] uint256 points

  function stateType(bytes _state) public pure returns (StateType _stateType) {
    uint offset = CommonState.gameStateOffset(_state);
    assembly {
      _stateType := mload(add(_state, offset))
    }
  }

  function aBal(bytes _state) public pure returns (uint256 _aBal) {
    uint offset = CommonState.gameStateOffset(_state) + 32;
    assembly {
      _aBal := mload(add(_state, offset))
    }
  }

  function bBal(bytes _state) public pure returns (uint256 _bBal) {
    uint offset = CommonState.gameStateOffset(_state) + 64;
    assembly {
      _bBal := mload(add(_state, offset))
    }
  }

  function points(bytes _state) public pure returns (uint256 _points) {
    uint offset = CommonState.gameStateOffset(_state) + 96;
    assembly {
      _points := mload(add(_state, offset))
    }
  }
}
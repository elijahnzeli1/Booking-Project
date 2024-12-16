/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { Room } from "./Room";
import { RoomCountArgs } from "./RoomCountArgs";
import { RoomFindManyArgs } from "./RoomFindManyArgs";
import { RoomFindUniqueArgs } from "./RoomFindUniqueArgs";
import { DeleteRoomArgs } from "./DeleteRoomArgs";
import { RoomService } from "../room.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Room)
export class RoomResolverBase {
  constructor(
    protected readonly service: RoomService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  async _roomsMeta(
    @graphql.Args() args: RoomCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Room])
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "any",
  })
  async rooms(@graphql.Args() args: RoomFindManyArgs): Promise<Room[]> {
    return this.service.rooms(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Room, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "read",
    possession: "own",
  })
  async room(@graphql.Args() args: RoomFindUniqueArgs): Promise<Room | null> {
    const result = await this.service.room(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Room)
  @nestAccessControl.UseRoles({
    resource: "Room",
    action: "delete",
    possession: "any",
  })
  async deleteRoom(@graphql.Args() args: DeleteRoomArgs): Promise<Room | null> {
    try {
      return await this.service.deleteRoom(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
